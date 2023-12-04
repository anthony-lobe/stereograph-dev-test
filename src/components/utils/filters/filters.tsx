import FilterButtons from "../filtersButtons/filtersButtons";

interface IFilters {
    onFilteringAllProjects(): any
    onFilteringPendingProjects(): any;
    onFilteringDoneProjects(): any;
    onFilteringWaitingProjects(): any;
}

function Filters( {onFilteringAllProjects,
                   onFilteringPendingProjects,
                   onFilteringDoneProjects,
                   onFilteringWaitingProjects,
                   } : IFilters) {
    return (
        <div>
            <FilterButtons buttonTitle="All" 
                           buttonColor="grey" 
                           onFiltering={onFilteringAllProjects}
            />
            <FilterButtons buttonTitle="En Attente" 
                           buttonColor="#fd644f" 
                           onFiltering={onFilteringWaitingProjects}/>
            <FilterButtons buttonTitle="En cours" 
                           buttonColor="#f78f20" 
                           onFiltering={onFilteringPendingProjects}
            />
            <FilterButtons buttonTitle="Terminé" 
                           buttonColor="green" 
                           onFiltering={onFilteringDoneProjects}
            />
        </div>
    )
}

export default Filters;