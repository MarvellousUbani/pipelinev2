
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
        
        let tableData = ``;

        

        for(let i = 0; i < results.length; i++){
            const {id, age, gender, row} = results[i];
           tableData += `<tr data-entryid ='${id}'><td>${row}</td><td>${gender}</td><td>${age}</td> </tr>`
        }

       // Showing current page on UI
      //   document.querySelector('[data-pageview]').innerHTML = `Showing Page ${currentPage}`;
      //   document.querySelector('[data-pageview]').dataset.pageview = currentPage;

       // Determine previous button state
      // document.querySelector('[data-prevbtn]').disabled = previousDisabled;
      // document.querySelector('[data-prevbtn]').dataset.prevbtn = currentPage-1;

      // Next Button Data state
      // document.querySelector('[data-nextbtn]').dataset.nextbtn = currentPage+1;

      paginationBuild();
      

      tBody.innerHTML = tableData;
      
        
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

     function paginationBuild(){
      if(document.querySelector(".btn-group")){
         document.querySelector(".btn-group").remove();
      }
      // Pagination Build
      let btnGroup = document.createElement("div");
      btnGroup.classList.add("btn-group");
      
      let prevBtn = document.createElement("button");
      prevBtn.dataset.prevbtn = currentPage - 1;
      prevBtn.innerText = `Previous`;
      prevBtn.addEventListener('click', () => {
         currentPage--;
         addData();
      });

      let nextBtn = document.createElement("button");
      nextBtn.dataset.nextbtn = currentPage + 1;
      nextBtn.innerText = `Next`;
      nextBtn.addEventListener('click', () => {
         nextData();
      });
 
      let pageViewLabel = document.createElement("label");
      pageViewLabel.dataset.pageview = currentPage;
      pageViewLabel.innerText = `Showing Page ${currentPage}`;

     
      btnGroup.append(prevBtn, nextBtn, pageViewLabel);
      document.querySelector(".page-container").appendChild(btnGroup);
     }


     
};

document.addEventListener('DOMContentLoaded', startApp);