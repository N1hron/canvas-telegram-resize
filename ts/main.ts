let SIZE = 100;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas#canvas') as HTMLCanvasElement | null;
    if (!canvas) return

    const typeSelect = document.querySelector('select#type-select') as HTMLSelectElement | null;
    const fileInput = document.querySelector('input#image-input') as HTMLInputElement | null;
    const link = document.querySelector('a#download') as HTMLAnchorElement | null;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    if (!(ctx && fileInput && link && typeSelect)) return;

    applyCanvasSize();

    typeSelect.addEventListener('change', (event) => {
        resetLink();
        SIZE = +(event.target as HTMLSelectElement).value;
        applyCanvasSize();
    })

    fileInput.addEventListener("change", (event) => {
        resetLink();

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

    function applyCanvasSize() {
        if (!canvas) return;

        canvas.width = SIZE;
        canvas.height = SIZE;
        canvas.style.width = SIZE + "px";
        canvas.style.height = SIZE + "px";
    }

    function resetLink() {
        if (!link) return;

        link.classList.add("link-disabled");
        link.download = "";
        link.href = "#";
    }
});