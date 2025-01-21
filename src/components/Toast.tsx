type ToastPropType = {
  UID: string,
  title: string,
  message: string,
  type: 'success' | 'error' | 'warning' | 'info',
}

const Toast = ({ ...rest }: ToastPropType) => {
  const { type, title, message, UID } = rest
  const handleType = (type: string) => {

    switch (type)
    {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'info':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const randomizeType = () => {
    const types: ToastPropType['type'][] = ['success', 'error', 'warning', 'info'];
    return types[Math.floor(Math.random() * types.length)];
  };

  const typeToUse = randomizeType();

  return (
    <div className={`p-4 rounded ${handleType(type)}`} id={UID}>
      <div className="toast-header">
        <strong className="mr-auto">{title} : {UID}</strong>
      </div>
      <div className="toast-body">
        {message} | {UID}
      </div>
    </div>
  )
}

export default Toast