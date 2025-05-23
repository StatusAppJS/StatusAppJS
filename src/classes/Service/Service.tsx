import SPService from "../../types/SPService";
import { SPFI } from "@pnp/sp";
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';
import StatusAppConfig from "../../types/StatusAppConfig";

class Service {
    Title: any;
    Status: string;
    service: SPService;
    refreshInterval: number = 10000;
    id: string;
    sp: SPFI;
    StatusConfig: StatusAppConfig;

    constructor(service: SPService) {
        const { provider: {sp, StatusConfig}} = UseProviderContext();
        this.id = `${service.Title!.replace(/ /g, '_')}_${crypto.randomUUID().replace(/-/g, '')}`;
        this.service = service;
        this.Title = service.Title;
        this.Status = service.Status || 'unknown';
        this.sp = sp;
        this.StatusConfig = StatusConfig;
        /*
        setInterval(() => {
            this.getChangedStatus();
        }, this.refreshInterval);
        */
    }

    async setStatus(status: string, modified: string) { 
        this.Status = status; 
        this.service.Modified = modified;
        this.service.Status = status;
    }

    async updateStatus(status: string) {
        await this.sp.web.lists.getById(this.StatusConfig.pageconfig.StatusListId).items.getById(this.service.Id).update({
            Status: status
        }).then(async(data) => {
            console.log("Status Updated on SharePoint...  Waiting for changetoken to refresh UI...");
        });
    }

    setRefreshInterval(interval: number) {
        this.refreshInterval = interval;
    }

    getChangedStatus() {
        /*this.RESTEngine.getService(this.service)
        .then((data) => {
            if (data.d.Status !== this.Status) {
                this.setStatus(data.d.Status);
            }
        });*/
    }

    /*
    getStatus() {
        this.RESTEngine.getService(this.service)
        .then((data) => {
            this.Status = data.d.Status;
        });
    }*/
}

export default Service;