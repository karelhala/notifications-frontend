import { Endpoint } from '@redhat-cloud-services/integrations-client/dist/types';
import { getIntegrationsApi } from '../../api';
import { AxiosRequestConfig } from 'axios';
import {
  Direction,
  Filters,
  UserIntegrationType,
} from '../../../types/Integration';
import { IntegrationFilterColumn } from '../../../components/Integrations/Filters';

const integrationsApi = getIntegrationsApi();

export type GetIntegrationParams = {
  size: number;
  index: number;
  filters?: Filters<typeof IntegrationFilterColumn>;
  sortBy?: {
    readonly column: string;
    readonly direction: Direction;
  };
  category?: readonly UserIntegrationType[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatError = (error: any): string => {
  const title = error.title || '';
  const violations = error.violations
    ? error.violations
        .map((violation) => `${violation.field}: ${violation.message}`)
        .join('; ')
    : '';

  return `${title}${violations ? ` - ${violations}` : ''}`;
};

export async function createEndpoint(
  config: Endpoint,
  notifications?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  afterSubmit?: () => void
) {
  try {
    await integrationsApi.createEndpoint(config);
    notifications.addSuccessNotification(
      'Integration created',
      `The integration ${
        config.name ? `${config.name} ` : ''
      }was created successfully.`
    );
    afterSubmit?.();
  } catch (e) {
    notifications.addDangerNotification(
      'Failed to create integration',
      formatError(e)
    ) || console.error(e);
  }
}

export async function updateEndpoint(
  id: string,
  data: Endpoint,
  config?: AxiosRequestConfig,
  notifications?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  afterSubmit?: () => void
) {
  try {
    await integrationsApi.updateEndpoint(id, data, config);
    notifications?.addSuccessNotification(
      'Integration updated',
      `The integration ${
        data.name ? `${data.name} ` : ''
      }was updated successfully.`
    );
    afterSubmit?.();
  } catch (e) {
    notifications?.addDangerNotification(
      'Failed to update integration',
      formatError(e)
    ) || console.error(e);
  }
}

export async function getIntegrations(config: GetIntegrationParams) {
  return await getIntegrationsApi().getIntegrations({
    limit: config.size,
    active: config.filters?.enabled,
    name: config.filters?.name,
    offset: (config.index - 1) * config.size,
    sortBy: config.sortBy
      ? `${config.sortBy?.column}:${config.sortBy?.direction}`
      : '',
    type: config.category,
  });
}
