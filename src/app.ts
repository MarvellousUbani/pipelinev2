
const startApp = async () => {

    let modifiedPageData = {};
    let currentPage;


   // Onload
   fetchUserData();

    async function fetchUserData(page = 1) {
        const response = await fetch(`https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${page}`);
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const userData = await response.json();
        console.log(userData);

        // Save object and assign page
        currentPage = Number(userData['info'].page);

        // Caching & Modifying the fetched data into object
        modifiedPageData[currentPage] = userData['results'][0][currentPage];
        modifiedPageData[currentPage + 1] = userData['results'][0][currentPage + 1];


        console.log(modifiedPageData);
        addData();
    };


    // Function to Build DOM

     function addData(){
        let tBody = document.querySelector("tbody");
        tBody.replaceChildren();

        let results = modifiedPageData[currentPage];
        let previousDisabled = currentPage == 1 ? true : false;
        
        let currentBuild = ``;

        // Determine previous button state
        document.querySelector('[data-prevbtn]').disabled = previousDisabled;

        for(let i = 0; i < results.length; i++){
            const {id, age, gender, row} = results[i];
            currentBuild += `<tr data-entryid ='${id}'><td>${row}</td><td>${gender}</td><td>${age}</td> </tr>`
        }

        tBody.innerHTML = currentBuild;
        
     }

     function nextData(){
        // If its an odd page then there's no data to fetch
        currentPage++;
        if(modifiedPageData[currentPage]){
            addData();
            return;
        }

        fetchUserData(currentPage);

     }


     document.querySelector('[data-nextbtn]').addEventListener('click', () => {
        nextData();
     });

     document.querySelector('[data-prevbtn]').addEventListener('click', () => {
        currentPage--;
        addData();
     });

     
};

document.addEventListener('DOMContentLoaded', startApp);