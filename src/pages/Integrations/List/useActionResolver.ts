import { useCallback } from 'react';

import {
  IntegrationRow,
  OnEnable,
} from '../../../components/Integrations/Table';
import { UserIntegration } from '../../../types/Integration';
import { useFlag } from '@unleash/proxy-client-react';

interface ActionResolverParams {
  onEdit: (integration: UserIntegration) => void;
  onTest: (integration: UserIntegration) => void;
  onDelete: (integration: UserIntegration) => void;
  canRead: boolean;
  canWrite: boolean;
  onEnable: OnEnable;
}

export const useActionResolver = (params: ActionResolverParams) => {
  const integrationTest = useFlag('insights.integrations.test');
  return useCallback(
    (integration: IntegrationRow, index: number) => {
      const onEdit = params.onEdit;
      const onTest = params.onTest;
      const onDelete = params.onDelete;
      const onEnable = params.onEnable;

      const isDisabled = !params.canWrite;
      const isTestDisabled = !params.canRead;

      return [
        {
          title: 'Edit',
          isDisabled,
          onClick: () => onEdit(integration),
        },
        ...(integrationTest
          ? [
              {
                title: 'Test',
                isDisabled: isTestDisabled,
                onClick: () => onTest(integration),
              },
            ]
          : []),
        {
          title: 'Delete',
          isDisabled,
          onClick: () => onDelete(integration),
        },
        {
          title: integration.isEnabled ? 'Disable' : 'Enable',
          isDisabled,
          onClick: () => onEnable(integration, index, !integration.isEnabled),
        },
      ];
    },
    [
      params.onEdit,
      params.onTest,
      params.onDelete,
      params.canWrite,
      params.canRead,
      params.onEnable,
      integrationTest,
    ]
  );
};
