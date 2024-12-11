import { useContext } from 'react'
import { DashboardContext } from '@/contexts/dashboard-context'

export function useDashboard() {
  return useContext(DashboardContext)
}
