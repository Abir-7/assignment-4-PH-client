import PhotoAlbum, { Photo } from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useState } from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";

const ImageGallery = ({ photos }: { photos: Photo[] }) => {
  const [index, setIndex] = useState(-1);
  return (
    <div className="container">
      <SectionTitle text="Image Gallery"></SectionTitle>
      <div className="mx-2">
        <PhotoAlbum
          photos={photos.slice(0, 15)}
          layout="masonry"
          targetRowHeight={150}
          onClick={({ index }) => setIndex(index)}
          renderPhoto={(data) => (
            <img {...data.imageProps} className="object-cover" />
          )}
        />
      </div>
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </div>
  );
};

export default ImageGallery;
