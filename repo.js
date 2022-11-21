const url = 'https://api.github.com/repos/pavel-ironfoot/dwarven-matrix/branches/master';

const test = async (url) => {
    const response = await fetch(url);
    if(response.ok){
        let data = await response.json();
        console.log(data);
        console.log(data.commit.commit.author.date);
    }else{
        console.error('error!!!!!!!!!!',response.status);
    }
}

test(url);
