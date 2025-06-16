import { useSelector } from 'react-redux'
import { toastColorMap } from '../../store/slices/settingsSlice';

const Toast = () => {
  const { toast } = useSelector(state => state.settings);

  if (!toast.show) return null

  const colors = toastColorMap[toast.type] || toastColorMap.info

  return (
    <div className={`fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-md border rounded-2xl px-4 py-3 flex items-center gap-3 animate-fade-in-out ${colors}`}>
      <i className={`${toast.icon} text-lg`}></i>
      <p className="text-sm font-medium">{toast.message}</p>
    </div>
  )
}

export default Toast