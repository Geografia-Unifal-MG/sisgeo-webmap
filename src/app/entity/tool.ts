export class Tool {
    public id: string;
    public name: string;
    public selector: string;
    public target: string;

    public static Download: Tool = {
        id: "5c5d6293c4267d000128431f",
        name: 'Download',
        selector: "app-layer-download-tool",
        target: "<app-layer-download-tool [shared]=\"layer\"></app-layer-download-tool>"
    };

    public static Metadata: Tool = {
        id: "5c5d6293c4267d0001284320",
        name: "Metadata",
        selector: "app-metadata-tool",
        target: "<app-metadata-tool [shared]=\"layer\"></app-metadata-tool>",
    };

    public static Transparency: Tool = {
        id: "5c5476e9e16438142572c47f",
        name: "Transparency",
        selector: "app-transparency-tool",
        target: "<app-transparency-tool [shared]=\"layer\"></app-transparency-tool>",
    };

    public static FitBounds: Tool = {
        id: "5ee0358f5f9346c738825ed0",
        name: "FitBounds",
        selector: "fit-bounds-tool",
        target: "<fit-bounds-tool [shared]=\"layer\"></fit-bounds-tool>",
    };    

    public static getTool(id: string) {

        if (id == Tool.Download.id)
        {
            return Tool.Download;
        }
        if (id == Tool.Metadata.id)
        {
            return Tool.Metadata;
        }
        if (id == Tool.Transparency.id)
        {
            return Tool.Transparency;
        }
        if (id == Tool.FitBounds.id)
        {
            return Tool.FitBounds;
        }

        return null;
    }
}