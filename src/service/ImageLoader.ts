class ImageLoader {
    static load = (onComplete: (result: any) => void) => {
        const getBase64 = (file: any) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => onComplete(reader.result);
            reader.onerror = error => console.error('Error: ', error);
        }

        const input = document!.getElementById('inputImage') as any;
        const file = input.files[0];

        getBase64(file);
    }
}

export default ImageLoader;