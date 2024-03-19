import { useContext } from 'react'
import { Redirect, Tabs } from 'expo-router'
import { GlobalState } from '../../global-provider'
import IconDashboard from '../../assets/icons/dashboard.svg'
import IconAccounts from '../../assets/icons/accounts.svg'
import IconBudget from '../../assets/icons/budget.svg'
import IconTransactions from '../../assets/icons/transactions.svg'
import IconInvestments from '../../assets/icons/investments.svg'

export default function TabLayout() {
  const global = useContext(GlobalState)
  

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'green' }}>
      <Tabs.Screen
        name='dashboard'
        options={{
          title: 'Dashboard',
          tabBarIcon: () => <IconDashboard />,
        }}
      />
      <Tabs.Screen
        name='accounts'
        options={{
          title: 'Accounts',
          tabBarIcon: () => <IconAccounts />,
        }}
      />
      <Tabs.Screen
        name='transactions'
        options={{
          title: 'Transactions',
          tabBarIcon: () => <IconTransactions />,
        }}
      />
      <Tabs.Screen
        name='budget'
        options={{
          title: 'Budget',
          tabBarIcon: () => <IconBudget />,
        }}
      />
      <Tabs.Screen
        name='investments'
        options={{
          title: 'Investments',
          tabBarIcon: () => <IconInvestments />,
        }}
      />
    </Tabs>
  )
}
