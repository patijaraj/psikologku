import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
const CreateReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateReport.url(options),
    method: 'get',
})

CreateReport.definition = {
    methods: ["get","head"],
    url: '/admin/reports/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
CreateReport.url = (options?: RouteQueryOptions) => {
    return CreateReport.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
CreateReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateReport.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
CreateReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateReport.url(options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
const CreateReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CreateReport.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
CreateReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CreateReport.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
CreateReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CreateReport.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

CreateReport.form = CreateReportForm

export default CreateReport