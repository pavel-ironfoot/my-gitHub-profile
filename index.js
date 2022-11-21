const inputSearch = document.querySelector('.js_inputText');
const form = document.querySelector('.js_searchForm');
const deleteProfile = document.querySelector('.js_deleteProf');
const footerProfile = document.querySelector('.profiles');
const element = document.querySelector('.prof');
const footerRepo = document.querySelector('.footerRepo');

const searchProfile = async (e) => {
    e.preventDefault();
    let userNick = inputSearch.value;
    console.log(userNick);
    try{
        const response = await fetch(`https://api.github.com/users/${userNick}`);
        if (response.ok) {
            let data = await response.json();
            console.log(data.repos_url);
            createElementProfile(data);
            /////////////////////////
            const getUsersRepo = async (url) => {
                const response = await fetch(url);
                if (response.ok) {
                    let dataIn = await response.json();
                    console.log(dataIn);
                    console.log(dataIn.length);
                    // const profile = document.querySelector(`.prof`);
                    for (let i = 0; i < dataIn.length; i++) {
                        let repoElement = document.createElement('div');
                        repoElement.innerHTML = dataIn[i].name;
                        footerRepo.appendChild(repoElement);
                    }
    
                } else {
                    console.error('error repo!!!!!!!!!!', response.status);
                }
            }
            //////////////////////////
    
            document.querySelector('.js_showRepo').addEventListener('click', () => {
                    // if(footerRepo.textContent!==''){return}
                    // getUsersRepo(data.repos_url);
                    if(footerRepo.textContent!==''){
                        footerRepo.innerHTML=''
                    }else{
                        getUsersRepo(data.repos_url)
                    }
    
            });
    
        } else {
            element.innerHTML = '<p>sorry, guest</p><p>unknown userName<p>';
            console.error('error!!!!!!!!!!', response.status);
        }
    
        form.reset();
    }catch(error){
        console.log('footer error is: ',error);
        footerProfile.innerHTML = `<p>again you, agent Smith ...</p>`
    }
 
}



form.addEventListener('submit', (e) => searchProfile(e));

function createElementProfile(profileData) {
    
    element.innerHTML = `
                    <img class="footerImg" src="${profileData.avatar_url}"></img>
                    <p>${profileData.name}</p>
                    <p>${profileData.login}</p>
                    <button class="js_showRepo">show Repo</button>
                    `;
}
deleteProfile.addEventListener('click',clearFooter);
function clearFooter(){
    footerProfile.innerHTML='';
}