const inputValue = document.getElementById("input-value");
const word = document.getElementById("word");
const phonetic = document.getElementById("phonetic");

// container 
const container = document.getElementById("container");

const getData = () => {
    const value = inputValue.value;
    console.log(value);
    loadData(value);
    inputValue.value = '';
}


// load data 
const loadData = async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
}


const setData = data => { 
    const info = data[0];
    word.innerText = info.word;
    phonetic.innerText = info.phonetic;
    container.innerHTML = '';

    const meaning = info.meanings;
    meaning.forEach(element => {
        const div = document.createElement('div');
        div.classList = 'py-4';
        const p = document.createElement('p');
        p.innerText = element.partOfSpeech;
        const ul = document.createElement('ul');

        element.definitions.forEach(rakib => {
            const li = document.createElement('li');
            li.classList = "list-disc";
			li.innerText = rakib.definition;
			ul.appendChild(li);
			
		});

        div.appendChild(p);
        div.appendChild(ul);
        container.appendChild(div);
    });

    
}
    