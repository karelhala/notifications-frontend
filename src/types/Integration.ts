import { Schemas } from '../generated/OpenapiIntegrations';
import { UUID } from './Notification';

// Integrations that exist

export enum IntegrationBaseType {
  CAMEL = 'camel',
}

export const UserIntegrationBaseType = {
  CAMEL: IntegrationBaseType.CAMEL,
} as const;

export enum IntegrationSubType {
  WEBHOOK = 'webhook',
  EMAIL_SUBSCRIPTION = 'email_subscription',
  SPLUNK = 'splunk',
  SLACK = 'slack',
  SERVICE_NOW = 'servicenow',
  TEAMS = 'teams',
  GOOGLE_CHAT = 'google_chat',
  ANSIBLE = 'ansible',
  DRAWER = 'drawer',
  PAGERDUTY = 'pagerduty',
}

// Value should always be type:sub_type or only type if doesn't use sub_types
export enum IntegrationType {
  WEBHOOK = 'webhook',
  EMAIL_SUBSCRIPTION = 'email_subscription',
  SPLUNK = `${IntegrationBaseType.CAMEL}:splunk`,
  SLACK = `${IntegrationBaseType.CAMEL}:slack`,
  SERVICE_NOW = `${IntegrationBaseType.CAMEL}:servicenow`,
  TEAMS = `${IntegrationBaseType.CAMEL}:teams`,
  GOOGLE_CHAT = `${IntegrationBaseType.CAMEL}:google_chat`,
  ANSIBLE = 'ansible', // Event-Driven Ansible
  DRAWER = 'drawer',
  PAGERDUTY = 'pagerduty',
}

export const UserIntegrationType = {
  WEBHOOK: IntegrationType.WEBHOOK,
  ANSIBLE: IntegrationType.ANSIBLE,
  SPLUNK: IntegrationType.SPLUNK,
  SERVICE_NOW: IntegrationType.SERVICE_NOW,
  SLACK: IntegrationType.SLACK,
  TEAMS: IntegrationType.TEAMS,
  GOOGLE_CHAT: IntegrationType.GOOGLE_CHAT,
  PAGERDUTY: IntegrationType.PAGERDUTY,
} as const;

export const UserIntegrationSubType = {
  WEBHOOK: IntegrationSubType.WEBHOOK,
  ANSIBLE: IntegrationSubType.ANSIBLE,
  SPLUNK: IntegrationSubType.SPLUNK,
  SERVICE_NOW: IntegrationSubType.SERVICE_NOW,
  SLACK: IntegrationSubType.SLACK,
  TEAMS: IntegrationSubType.TEAMS,
  GOOGLE_CHAT: IntegrationSubType.GOOGLE_CHAT,
  PAGERDUTY: IntegrationSubType.PAGERDUTY,
} as const;

export enum IntegrationCategory {
  COMMUNICATIONS = 'Communications',
  REPORTING = 'Reporting',
  WEBHOOKS = 'Webhooks',
}

export type Subtypes<U, S extends string> = U extends `${S}:${string}`
  ? U
  : never;
export type CamelIntegrationType = Subtypes<IntegrationType, 'camel'>;

export const isCamelType = (
  type?: IntegrationType
): type is CamelIntegrationType => !!type && type.startsWith('camel:');
export const isCamelIntegrationType = (
  integration: Partial<Integration>
): integration is IntegrationCamel =>
  !!integration.type && isCamelType(integration.type);

export const isUserIntegrationType = (
  type?: IntegrationType
): type is UserIntegrationType =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !!type && Object.values(UserIntegrationType).includes(type as any);

export type UserIntegrationType =
  (typeof UserIntegrationType)[keyof typeof UserIntegrationType];
export type UserIntegrationSubType =
  (typeof UserIntegrationSubType)[keyof typeof UserIntegrationSubType];

export interface IntegrationBase<T extends IntegrationType> {
  id: string;
  name: string;
  type: T;
  isEnabled: boolean;
  status?: Schemas.EndpointStatus | undefined;
  serverErrors: number;
}

export interface IntegrationHttp
  extends IntegrationBase<IntegrationType.WEBHOOK> {
  type: IntegrationType.WEBHOOK;
  url: string;
  sslVerificationEnabled: boolean;
  secretToken?: string;
  method: Schemas.HttpType;
}

export interface IntegrationAnsible
  extends IntegrationBase<IntegrationType.ANSIBLE> {
  url: string;
  sslVerificationEnabled: boolean;
  secretToken?: string;
  method: Schemas.HttpType;
}

export interface IntegrationPagerduty
  extends IntegrationBase<IntegrationType.PAGERDUTY> {
  secretToken: string;
  severity: Schemas.PagerDutySeverity;
}

export interface IntegrationDrawer
  extends IntegrationBase<IntegrationType.DRAWER> {
  type: IntegrationType.DRAWER;
  ignorePreferences: boolean | null | undefined;
  onlyAdmin: boolean | null | undefined;
  groupId?: UUID;
}

export interface IntegrationCamel
  extends IntegrationBase<CamelIntegrationType> {
  type: CamelIntegrationType;
  url: string;
  sslVerificationEnabled: boolean;
  secretToken?: string;
  basicAuth?: {
    user: string;
    pass: string;
  };
  extras?: Record<string, string>;
}

export interface IntegrationEmailSubscription
  extends IntegrationBase<IntegrationType.EMAIL_SUBSCRIPTION> {
  type: IntegrationType.EMAIL_SUBSCRIPTION;
  onlyAdmin: boolean | null | undefined;
  ignorePreferences: boolean | null | undefined;
  groupId?: UUID;
}

export type Integration =
  | IntegrationHttp
  | IntegrationAnsible
  | IntegrationEmailSubscription
  | IntegrationCamel
  | IntegrationDrawer
  | IntegrationPagerduty;
export type TypedIntegration<T extends IntegrationType> = Extract<
  Integration,
  {
    type: T;
  }
>;

// Integrations that the user can create in the Integrations page;
export type UserIntegration = Extract<
  Integration,
  {
    type: UserIntegrationType;
  }
>;

type NewIntegrationKeys = 'id' | 'serverErrors';

export type NewIntegrationTemplate<T extends IntegrationBase<IntegrationType>> =
  Omit<T, NewIntegrationKeys> & Partial<Pick<T, NewIntegrationKeys>>;

export type NewIntegrationBase = NewIntegrationTemplate<
  IntegrationBase<UserIntegrationType>
>;
export type NewIntegration = NewIntegrationTemplate<Integration>;
export type NewUserIntegration = NewIntegrationTemplate<UserIntegration>;

export type ServerIntegrationRequest = Schemas.Endpoint;
export type ServerIntegrationResponse = Schemas.Endpoint;

export interface IntegrationConnectionAttempt {
  date: Date;
  isSuccess: boolean;
}

export type GetIntegrationRecipient = (
  integrationId: UUID
) => Promise<string> | string;

export type IntegrationIcon = {
  icon_url: string;
  name: string;
  product_name: string;
};

export type IntegrationIconTypes = {
  [Property in UserIntegrationType]: IntegrationIcon;
};

export declare enum Direction {
  ASCENDING = 'ASC',
  DESCENDING = 'DESC',
}
export declare type EnumElement<Enum> = Enum[keyof Enum];
export declare type StandardFilterEnum<T> = Record<keyof T, string>;
export declare type FilterBase<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Enum extends StandardFilterEnum<any>,
  T
> = Record<EnumElement<Enum>, T>;
export declare type FilterContent = string | Array<string> | undefined;
export declare type Filters<Enum extends StandardFilterEnum<unknown>> =
  FilterBase<Enum, FilterContent>;
