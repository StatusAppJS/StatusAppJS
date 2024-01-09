import { IItem } from "@pnp/sp/items"

type SPItem = IItem & {
    __metadata: {
        id: string,
        uri: string,
        etag: string,
        type: string
    },
    FirstUniqueAncestorSecurableObject: {
        __deferred: {
            uri: string
        }
    },
    RoleAssignments: {
        __deferred: {
            uri: string
        }
    },
    AttachmentFiles: {
        __deferred: {
            uri: string
        }
    },
    ContentType: {
        __deferred: {
            uri: string
        }
    },
    GetDlpPolicyTip: {
        __deferred: {
            uri: string
        }
    },
    FieldValuesAsHtml: {
        __deferred: {
            uri: string
        }
    },
    FieldValuesAsText: {
        __deferred: {
            uri: string
        }
    },
    FieldValuesForEdit: {
        __deferred: {
            uri: string
        }
    },
    File: {
        __deferred: {
            uri: string
        }
    },
    Folder: {
        __deferred: {
            uri: string
        }
    },
    ParentList: {
        __deferred: {
            uri: string
        }
    },
    FileSystemObjectType: number,
    Id: number,
    ContentTypeId: string,
    Title: string,
    Status: string,
    Description: string,
    ServiceType: string,
    ID: number,
    Modified: string,
    Created: string,
    AuthorId: number,
    EditorId: number,
    OData__UIVersionString: string,
    Attachments: boolean,
    GUID: string,
}

export default SPItem;