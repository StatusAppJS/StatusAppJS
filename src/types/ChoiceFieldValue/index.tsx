import BlockPicker from "react-color/lib/components/block/Block"

export type Choice = {
    Title: string,
    Color: string,
    Id: string,
    Icon: string,
    ColorPalletteToggle?: boolean,
    nodeRef?: React.RefObject<BlockPicker>
}