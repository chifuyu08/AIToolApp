/* eslint-disable react/prop-types */

function FormField({
  LabelName,
  type,
  name,
  placeholder,
  value,
  handleOnChange,
  isSupriseMe,
  handleSupriseMe,
  className,
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {LabelName}
        </label>
        {isSupriseMe && (
          <button
            type="button"
            onClick={handleSupriseMe}
            className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black"
          >
           Random Search 
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        required
        autoComplete="off"
        className={`${className ? `${className}` : "w-full" } bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block p-3 `}
      />
    </div>
  );
}

export default FormField;
