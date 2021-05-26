export const GA_TRACKING_ID = "G-RHWW9XKP69";

declare global {
    interface Window {
        gtag: any;
    }
}

export class Ga {
    pageview(url: URL) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        })
    }

    event({action, category, label, value}: GaEvent) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}

export interface GaEvent {
    action?: string,
    category?: string,
    label?: string,
    value?: any
}

export default new Ga();