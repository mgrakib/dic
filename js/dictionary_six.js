// get element 
const getElement = (id) => document.getElementById(id);


// elements
const inputFeild = getElement("input-feild");
const errowShow = getElement("errow-show");
const errowMessage = getElement("errow-message");
const wordName = getElement("word-name");
const wordPhonetic = getElement("word-phonetic");
const audioContainer = getElement("audio-container");
const meaningContainer = getElement("meaning-container");



// get input value 
const getData = () => {
    const inputValue = inputFeild.value;
    loadData(inputValue);
}

// load data 
const loadData = async (value) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.title === "No Definitions Found") {
        errowShow.classList.remove('hidden');
        errowMessage.innerText = data.message;
        setTimeout(function () {
            errowShow.classList.add("hidden");
        }, 3000)
    } else {
        setData(data[0]);
    }
}


const setData = (info) => {
    // to see value 
    console.log(info);
    inputFeild.value = "";
    // object destracturtring
    const { word, phonetic, phonetics, meanings } = info;

    // set value 
    wordName.innerText = word;
    wordPhonetic.innerText = phonetic;
   


    phonetics.forEach(element => {
        // console.log(element.audio);
        if (element.audio) {
            audioContainer.innerHTML = '';
            const audio = document.createElement("audio");
            audio.src = element.audio;

            const div = document.createElement("div");
            div.classList.add("cursor-pointer");
            div.innerHTML = `<div onclick="playAudio(${audio})"  id="playAudio" class="w-[40px] md:w-[60px] h-[40px] md:h-[60px] bg-gray-400 rounded-full flex items-center justify-center">
            <i class="fa-solid fa-play"></i>
              </div>`;
            div.appendChild(audio);
            div.onclick = () => {
                audio.play();
            }

            audioContainer.appendChild(div);

        }
    })



    // definations 
    meaningContainer.innerHTML = "";
    meanings.forEach(meaning => {
		// main div
		const mainDiv = document.createElement("div");
		// h1
		const h1 = document.createElement("h1");
		h1.classList.add("text-success", "font-bold", "text-3xl");
		h1.innerText = meaning.partOfSpeech;


        // seconddiv ***************
		// ol container
		const div = document.createElement("div");
		div.classList.add("py-4");

		// h4
		const h4 = document.createElement("h4");
		h4.classList.add("text-accent", "text-2xl");
		h4.innerText = "Meaning";
		div.appendChild(h4);

		// ul
		const ul = document.createElement("ul");
		ul.classList.add("py-3", "ml-5", "list-decimal");
		ul.innerHTML = "";

		// defination
		meaning.definitions.forEach(def => {
			const li = document.createElement("li");
			li.innerText = def.definition;
			ul.appendChild(li);
		});

		div.appendChild(ul);

        console.log(meaning.synonyms.length);
        if (meaning.synonyms.length !== 0) {
            const synonymsContainer = document.createElement("div");
			synonymsContainer.innerHTML = "";
			const synonymsTitle = document.createElement("span");
			synonymsTitle.innerHTML = `<span class="text-2xl text-gray-500 mr-2">Synonyms:</span> `;
			synonymsContainer.appendChild(synonymsTitle);

			// meaning.synonyms.forEach(syn => {
            //     const synonymsDiv = document.createElement("span");
            //     if (meaning.synonyms.lastIndexOf(syn) === meaning.synonyms) {
			// 	}
			// 	synonymsDiv.innerText = syn + " , ";
			// 	synonymsContainer.appendChild(synonymsDiv);
			// });
            
            const stringDiv = document.createElement('div');
            stringDiv.classList.add('inline-block')
            stringDiv.innerText = meaning.synonyms;

            
            synonymsContainer.appendChild(stringDiv);

			div.appendChild(synonymsContainer);
        } else {
            
        }

        
		


		mainDiv.appendChild(h1);
		mainDiv.appendChild(div);

		meaningContainer.appendChild(mainDiv);
	})


    // synonims 


}


loadData('keyboard');


const playAudio = (audio) => {
    console.log(audio);
}











       