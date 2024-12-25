
        const words = ["ephemeral", "luminous", "serendipity", "petrichor", "ethereal","prejudice","abysmal","ludicrous","serene","obscene","vile","rye"];

        let currentIndex = parseInt(localStorage.getItem("wordIndex")) || 0;
        const currentWord = words[currentIndex];

        async function fetchDefinition(word) {
            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                const data = await response.json();

                if (response.ok) {
                    const definition = data[0].meanings[0].definitions[0].definition;
                    document.getElementById("word").textContent = `Word: ${word}`;
                    document.getElementById("definition").textContent = `Definition: ${definition}`;
                } else {
                    throw new Error(data.title || "Error fetching definition");
                }
            } catch (error) {
                document.getElementById("word").textContent = `Word: ${word}`;
                document.getElementById("definition").textContent = `Definition: Not available (${error.message})`;
            }
        }

        // Fetch the definition of the current word
        fetchDefinition(currentWord);

        // Update the index for the next reload and save to localStorage
        currentIndex = (currentIndex + 1) % words.length;
        localStorage.setItem("wordIndex", currentIndex);

