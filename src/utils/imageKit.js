
/**
 * Utility to generate ImageKit URLs.
 * 
 * @param {string} path - The path to the image (e.g., "Project_img/dental.webp")
 * @param {object} options - Transformation options
 * @param {number} options.width - Width in pixels
 * @param {number} options.height - Height in pixels
 * @param {string} options.format - Output format (auto, webp, avif, etc.)
 * @param {number} options.quality - Quality (1-100)
 * @returns {string} - The complete ImageKit URL
 */
export const getImg = (path, options = {}) => {
    // Get endpoint from env or use placeholder
    const urlEndpoint = import.meta.env.VITE_IMAGEKIT_ENDPOINT || "https://ik.imagekit.io/your_id_here";

    // Clean path to ensure no double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Construct transformation string
    let transformations = [];

    if (options.width) transformations.push(`w-${options.width}`);
    if (options.height) transformations.push(`h-${options.height}`);
    if (options.quality) transformations.push(`q-${options.quality}`);

    // Default to auto format handling if not specified (ImageKit does this by default if enabled in dashboard, 
    // but we can force it via f-auto)
    if (options.format) {
        transformations.push(`f-${options.format}`);
    } else {
        transformations.push('f-auto');
    }

    const trString = transformations.length > 0 ? `tr=${transformations.join(',')}` : '';

    // Construct final URL
    // Pattern: endpoint / [transformations] / path
    // Example: https://ik.imagekit.io/demo/tr=w-300,h-300/medium_cafe_B1iTdD0C.jpg

    if (trString) {
        return `${urlEndpoint}/${cleanPath}?${trString}`;
    }

    return `${urlEndpoint}/${cleanPath}`;
};

/**
 * Utility specifically for videos to ensure they stream correctly
 */
export const getVideo = (path) => {
    let urlEndpoint = import.meta.env.VITE_IMAGEKIT_ENDPOINT || "https://ik.imagekit.io/your_id_here";
    if (urlEndpoint.endsWith('/')) {
        urlEndpoint = urlEndpoint.slice(0, -1);
    }
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${urlEndpoint}/${cleanPath}`;
}
