export function usePreloadImages() {
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  };

  const preloadImages = async (imageSrcs: string[]) => {
    try {
      await Promise.all(imageSrcs.map(preloadImage));
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  };

  return { preloadImage, preloadImages };
} 