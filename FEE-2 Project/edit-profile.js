document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {

        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        

        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});


document.getElementById('photo-upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('profile-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Profile updated:', data);
    
    alert('Profile updated successfully!');
});