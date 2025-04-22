function ColorPicker({ currentColor, onChange }) {
    const colors = [
      '#ffffff', '#ffcdd2', '#f8bbd0', '#e1bee7',
      '#d1c4e9', '#c5cae9', '#bbdefb', '#b3e5fc',
      '#b2ebf2', '#b2dfdb', '#c8e6c9', '#dcedc8',
      '#f0f4c3', '#fff9c4', '#ffecb3', '#ffe0b2'
    ];
  
    return (
      <div className="color-picker">
        {colors.map(color => (
          <button
            key={color}
            className={`color-option ${currentColor === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            title={color}
          />
        ))}
      </div>
    );
  }
  
  export default ColorPicker;