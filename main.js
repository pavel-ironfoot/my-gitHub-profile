const MY_PROFILE_URL = 'https://api.github.com/users/pavel-ironfoot';
const mainMe = document.querySelector('.main-me');
const myRepos = document.querySelector('.my-repos');

let arrDataRepos = [];
const showMyReposData = async (url,i) => {
    const response = await fetch(url);
    if(response.ok){
        let data = await response.json();                              
        arrDataRepos[i] = await data.commit.commit.author.date;                               
        document.querySelector(`.repo${i}`).addEventListener('click',()=>{ 
            if(document.querySelector(`.repo${i}`).textContent==='click to show date'){
                showPreloaderRepo('please, wait...',document.querySelector(`.preloader-repo${i}`));
                document.querySelector(`.repo${i}`).innerHTML = arrDataRepos[i];
            }else{
                document.querySelector(`.repo${i}`).innerHTML = 'click to show date';
            }
        }); 
    }else{
        document.querySelector(`.repo${i}`).innerHTML = 'Sorry, you are not Neo...';
        console.error('error!!!!!!!!!!',response.status);
    }   
}    
const getAndShowMyRepos = async (url) => {
    const response = await fetch(url);
    if(response.ok){
        let dataIn = await response.json();
        let myReposHtml ='';
        for(let i=0;i<dataIn.length;i++){
            myReposHtml = myReposHtml + `<div class="my-repos-elem">
                    <p>repository name: ${dataIn[i].name}</p>
                    <p>branch: ${dataIn[i].default_branch}</p>
                    <div class="repo-show-commit repo${i}">click to show date</div>
                    <div class="preloader-repo preloader-repo${i}"></div>
                    <a target="_blank" href="https://pavel-ironfoot.github.io/${dataIn[i].name}/">visit site(gh-pages)</a>                          
                    </div>`;    
        }
        showMyRepos(myReposHtml);

        for(let i=0;i<dataIn.length;i++){                      
            showMyReposData(dataIn[i].branches_url.replace('{/branch}','/main'),i);
        }   
    }else{
        myRepos.innerHTML = `
        <p>sorry, you are not Neo...</p>
    `;
        console.error('error!!!!!!!!!!',response.status);
    }
}

const getUserMe = async (url) => {
    try{
        const response = await fetch(url);
        if(response.ok){
            let data = await response.json();
            createMyProfile(data);
            getAndShowMyRepos(data.repos_url);
        }else{
            mainMe.innerHTML = '<p>sorry, you are not Neo...</p>';           
        }
    }catch(error){
        mainMe.innerHTML = '<p>sorry, you are not Neo, agent Smith...</p>';
        console.log('main error is: ',error);
    }   
}
getUserMe(MY_PROFILE_URL);


function createMyProfile(data){
    mainMe.innerHTML = `
        <img class="mainImg" src="${data.avatar_url}">
        <p>${data.name}</p>
        <p>${data.login}</p>
        <p>${data.bio}</p>
    `;
}
function showMyRepos(repos){
        myRepos.innerHTML=repos;
}
function showPreloaderRepo(text,doc){
    doc.style.display = 'block';
    showMatrixText(text,doc);
    setTimeout(()=>{
        doc.style.display = 'none';
    },2000);
}
