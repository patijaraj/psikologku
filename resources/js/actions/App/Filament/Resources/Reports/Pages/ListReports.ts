import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
const ListReports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListReports.url(options),
    method: 'get',
})

ListReports.definition = {
    methods: ["get","head"],
    url: '/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
ListReports.url = (options?: RouteQueryOptions) => {
    return ListReports.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
ListReports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListReports.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
ListReports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListReports.url(options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
const ListReportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ListReports.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
ListReportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ListReports.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
ListReportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ListReports.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

ListReports.form = ListReportsForm

export default ListReports