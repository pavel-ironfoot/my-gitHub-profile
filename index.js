const inputSearch = document.querySelector('.js-input-text');
const form = document.querySelector('.js-search-form');
const deleteProfile = document.querySelector('.js-delete-prof');
const footerProfile = document.querySelector('.profiles');
const element = document.querySelector('.prof');
const footerRepo = document.querySelector('.footer-repo');

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
            const getUsersRepo = async (url) => {
                const response = await fetch(url);
                if (response.ok) {
                    let dataIn = await response.json();
                    console.log(dataIn);
                    console.log(dataIn.length);
                    
                    for (let i = 0; i < dataIn.length; i++) {
                        let repoElement = document.createElement('div');
                        repoElement.innerHTML = dataIn[i].name;
                        footerRepo.appendChild(repoElement);
                    }
    
                } else {
                    console.error('error repo!!!!!!!!!!', response.status);
                }
            }   
            document.querySelector('.js-show-repo').addEventListener('click', () => {
                    
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
                    <img class="footer-img" src="${profileData.avatar_url}"></img>
                    <p>${profileData.name}</p>
                    <p>${profileData.login}</p>
                    <button class="js-show-repo">show Repo</button>
                    `;
}
deleteProfile.addEventListener('click',clearFooter);
function clearFooter(){
    footerProfile.innerHTML='';
}