import { createFileRoute } from '@tanstack/react-router'

import manageProducts from '../../../components/manageProducts'

export const Route = createFileRoute('/__app/manage-products/')({
  component: manageProducts,
})


