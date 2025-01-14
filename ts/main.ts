let SIZE = 100;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas#canvas') as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");
    const typeSelect = document.querySelector('select#type-select') as HTMLSelectElement | null;
    const fileInput = document.querySelector('input#image-input') as HTMLInputElement | null;
    const link = document.querySelector('a#download') as HTMLAnchorElement | null;
    const image = new Image();

    if (!(canvas && ctx && fileInput && link && typeSelect)) return;

    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.style.width = SIZE + "px";
    canvas.style.height = SIZE + "px";

    typeSelect.addEventListener('change', (event) => {
        SIZE = +(event.target as HTMLSelectElement).value;

        canvas.width = SIZE;
        canvas.height = SIZE;
        canvas.style.width = SIZE + "px";
        canvas.style.height = SIZE + "px";

        console.log(SIZE);
    })

    fileInput.addEventListener("change", (event) => {
        link.classList.add("link-disabled");
        const files = (event.target as HTMLInputElement).files;
        if (!files) return;

        const imgFile = files[0];
        if (image.src) URL.revokeObjectURL(image.src);
        const imgFileUrl = URL.createObjectURL(imgFile);
        image.src = imgFileUrl;

        image.addEventListener("load", () => {
            const { width, height } = image;
            const scale = Math.min(SIZE / width, SIZE / height);

            const newWidth = width * scale;
            const newHeight = height * scale;
            const dx = ((SIZE - newWidth) / 2) / scale;
            const dy = ((SIZE - newHeight) / 2) / scale;

            console.log(newWidth, newHeight, dx, dy);

            ctx.resetTransform();
            ctx.clearRect(0, 0, SIZE, SIZE);
            ctx.scale(scale, scale);
            ctx.drawImage(image, dx, dy);

            const downloadUrl = canvas.toDataURL('image/png', 1);
            link.download = imgFile.name;
            link.href = downloadUrl;
            link.classList.remove("link-disabled");
        }, { once: true });
    });

    console.log(ctx);
    console.log(fileInput);
});