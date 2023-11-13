
export enum Tabs {
    PARAMETERS,
    BODY,
    HEADERS,
    AUTHORISATION,
  }
  
export  enum BodyType {
    NONE = "None",
    APPLICATION_JSON = "application/json",
    APPLICATION_XML = "application/xml",
    APPLICATION_X_FORM_ENCODE = "application/x-www-form-encoded",
  }
export enum AuthType{
    NONE = "None",
    BASIC = "Basic",
    BEARER = "Bearer "
}

  export type OptionTypes = {
    Parameter: {
        id: number;
        key: string;
        Value: string;
    }[];
    Body: {
        type: BodyType;
        payload: string;
        forms: {
            id: number;
            key: string;
            value: string;
        }[];
    };
    Header: {
        id: number;
        key: string;
        Value: string;
    }[];
    Auth: {
        type: AuthType;
        username: string;
        password: string;
        token: string;
    };
}