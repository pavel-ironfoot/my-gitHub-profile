const myUrl = 'https://api.github.com/users/pavel-ironfoot';
const mainMe = document.querySelector('.mainMe');
const myRepos = document.querySelector('.myRepos');
const preloaderRepo = document.querySelector('.preloaderRepo');

const getUserMe = async (url) => {
    try{
        const response = await fetch(url);
        if(response.ok){
            let data = await response.json();
            createMyProfile(data);
            const myRepos = async (url) => {
                const response = await fetch(url);
                if(response.ok){
                    let dataIn = await response.json();
                    let myReposHtml ='';
                    for(let i=0;i<dataIn.length;i++){
                        myReposHtml = myReposHtml + `<div class="myReposElem">
                                <p>repository name: ${dataIn[i].name}</p>
                                <p>branch: ${dataIn[i].default_branch}</p>
                                <div class="repoShowCommit repo${i}">click to show date</div>
                                <div class="preloaderRepo preloaderRepo${i}"></div>
                                <a target="_blank" href="https://pavel-ironfoot.github.io/${dataIn[i].name}/">visit site(gh-pages)</a>                          
                                </div>`;    
                                console.log(dataIn[i].branches_url.replace('{/branch}','/main'));  
    
                    }
                    showMyRepos(myReposHtml);
                    let arrDataRepos = [];
                    for(let i=0;i<dataIn.length;i++){
                        ////////////////////////////////////////////
                        
                        const showMyReposData = async (url) => {
                            const response = await fetch(url);
                            if(response.ok){
                                let data = await response.json();
                                console.log(data);
                                arrDataRepos[i] = await data.commit.commit.author.date;
                                console.log(arrDataRepos[i]);
                                document.querySelector(`.repo${i}`).addEventListener('click',()=>{ 
                                    if(document.querySelector(`.repo${i}`).textContent==='click to show date'){
                                        showPreloaderRepo('please, wait...',document.querySelector(`.preloaderRepo${i}`));
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
                        console.log(dataIn[i].branches_url.replace('{/branch}','/main'));
                        showMyReposData(dataIn[i].branches_url.replace('{/branch}','/main'));
                    }
    
                }else{
                    myRepos.innerHTML = `
                    <p>sorry, you are not Neo...</p>
                `;
                    console.error('error!!!!!!!!!!',response.status);
                }
            }
            myRepos(data.repos_url);
        }else{
            mainMe.innerHTML = '<p>sorry, you are not Neo...</p>';
            console.log('fuck!');
        }

    }catch(error){
        mainMe.innerHTML = '<p>sorry, you are not Neo, agent Smith...</p>';
        console.log('main error is: ',error);
    }
    
}
getUserMe(myUrl);

function createMyProfile(data){
    mainMe.innerHTML = `
        <img class="mainImg" src="${data.avatar_url}"></img>
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