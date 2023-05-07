let users = [];

async function initRegister(){
    loadUsers();
}

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'))
    } catch (error) {
        console.info('Could not load users')
    }

}

async function register(){
    registerBtn.disabled = true;
    users.push({
        nameInput: nameInput.value,
        email: signupEmail.value,
        password: signupPassword.value,
    })

    await setItem('users', JSON.stringify(users))
    resetForm();
}

function resetForm(){
    nameInput.value = '';
    signupEmail.value = '';
    signupPassword.value = '';
    registerBtn.disabled = false;
}