export default function ColorBrightness(color: string, percent: number) {
    //default percent to itself or the new percentage
    percent = percent || 0;

    // guard clause for out of range
    if(percent > 100 || percent < -100) return;

    // converting whole numbers down to percentages.  
    if(percent > 1 || percent < -1){
        percent = percent/100;
    }

    // Break the hex apart into individual colors
    var num = parseInt(color.replace("#",""), 16),
    R = (num >> 16),
    G = (num >> 8 & 0x00FF),
    B = (num & 0x0000FF);

    //if percent is over 0, lighten towards #ffffff
    if(percent > 0){
        R = Math.round(R + (((255 - R) * percent)));
        G = Math.round(G + (((255 - G) * percent)));
        B = Math.round(B + (((255 - B) * percent)));
    }
    // if percent is under 0, darken towards #000000
    if(percent < 0){
        R = Math.round(R - ((R * Math.abs(percent))));
        G = Math.round(G - ((G * Math.abs(percent))));
        B = Math.round(B - ((B * Math.abs(percent))));
    }

    // Returns a hex value
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);

}