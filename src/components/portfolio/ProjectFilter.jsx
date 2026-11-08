export default function ProjectFilter({
  label,
  group,
  options,
  sorting = false,
}) {
  return (
    <div className="apart-s_cms_filter_item">
      <div data-select="" className="filter_select">
        <button
          type="button"
          data-select="btn"
          className="filter_select_btn studio-filter-btn"
          aria-label={`Filter by ${label}`}
        >
          <span className="l2 reg">{label}</span>
          <span className="filter_select_btn_label">
            <span data-select="value" className="l2">
              {options[0].label}
            </span>
            <span hover="ico" aria-hidden="true">
              ⌄
            </span>
          </span>
        </button>
        <div data-select="drop-down" className="filter_select_drop-down">
          <div className="filter_select_drop-down_list">
            {options.map((option) => (
              <button
                key={option.value + (option.order || "")}
                type="button"
                data-select="item"
                hover-select-item=""
                className="filter_select_drop-down_list_item studio-filter-option"
                {...(sorting
                  ? {
                      "data-sort-trigger": option.value,
                      "data-sort-order": option.order || "asc",
                    }
                  : {
                      "data-filter-group": group,
                      "data-filter-trigger": option.value,
                    })}
              >
                <span hover="text" className="l1">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
