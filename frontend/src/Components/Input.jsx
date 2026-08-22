export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon,
  LabelName,
  accept,
  className = "" // Zdt hna className bach t-qder t-overridiha men l-Login/Register
}) {
  return (
    <div className="relative w-full flex flex-col gap-1.5">
      {LabelName && (
        <label className="block text-[13px] font-bold text-gray-700 ml-1 uppercase tracking-tight">
          {LabelName}
        </label>
      )}
      
      <div className="relative group">
        {icon && (
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200">
            {icon}
          </span>
        )}
        
        <input
          type={type}
          name={name}
          value={value}
          accept={accept}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full
            bg-white
            border border-gray-100
            rounded-2xl
            ${icon ? "pl-12" : "px-6"} 
            py-4
            text-gray-800
            placeholder-gray-300
            shadow-sm
            outline-none
            focus:ring-4 focus:ring-orange-500/10 
            focus:border-orange-500
            transition-all
            duration-300
            ${className} 
          `}
        />
      </div>
    </div>
  );
}