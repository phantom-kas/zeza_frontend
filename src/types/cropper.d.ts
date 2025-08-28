declare namespace JSX {
  interface IntrinsicElements {
    "cropper-canvas": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      "scale-step"?: string | number;
      "theme-color"?: string;
      background?: boolean;
    };
    "cropper-image": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      rotatable?: boolean;
      scalable?: boolean;
      skewable?: boolean;
      translatable?: boolean;
    };
    "cropper-selection": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      aspectratio?: number;
      width?: number | string;
      height?: number | string;
      initialaspectratio?: number;
      movable?: boolean;
      resizable?: boolean;
      outlined?: boolean;
    };
    "cropper-handle": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      action?: string;
      "theme-color"?: string;
      plain?: boolean;
    };
    "cropper-grid": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      role?: string;
      covered?: boolean;
    };
    "cropper-shade": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      hidden?: boolean;
    };
  }
}
