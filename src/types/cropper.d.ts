declare namespace JSX {
  interface IntrinsicElements {
    'cropper-canvas': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'cropper-image': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { src?: string; alt?: string };
    'cropper-selection': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'cropper-handle': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'cropper-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'cropper-shade': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}