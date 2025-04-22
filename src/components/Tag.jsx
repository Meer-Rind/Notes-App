function Tag({ tag, onRemove }) {
    const tagColors = [
      '#FFECB3', '#C8E6C9', '#B3E5FC', '#D1C4E9', 
      '#F8BBD0', '#FFCCBC', '#CFD8DC', '#B2DFDB'
    ];
    const color = tagColors[Math.abs(tag.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % tagColors.length];
  
    return (
      <span 
        className="tag" 
        style={{ backgroundColor: color }}
      >
        {tag}
        {onRemove && (
          <button onClick={() => onRemove(tag)} className="tag-remove">
            ×
          </button>
        )}
      </span>
    );
  }
  
  export default Tag;