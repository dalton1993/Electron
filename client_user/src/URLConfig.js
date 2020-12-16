//export const api = 'http://localhost:2000/api';
export const api = 'https://electron-commerce.herokuapp.com/api'; 
export const generatePublicURL = (filename) => {
    //return `http://localhost:2000/public/${filename}`; 
    return `https://electron-commerce.herokuapp.com/public/${filename}`;
}