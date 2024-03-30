import { MaterialReactTable } from "material-react-table";
import React from "react";

export interface absensiTableInterface {
    columns: any[],
    data: any[],
    renderRowActions?: any,
    renderRowActionMenuItems?: any,
    loading?: boolean,
    muiTableBodyRowProps?: any,
    setPagination?: any
    pagination?: any,
    metaPagination?: any,
    disableBorderAction?: boolean
}

const AbsensiTable = ({
    columns = [],
    data = [],
    renderRowActions = undefined,
    renderRowActionMenuItems = undefined,
    loading = false,
    muiTableBodyRowProps = undefined as any,
    setPagination = undefined,
    pagination = undefined,
    metaPagination = { total: 1, per_page: 0 },
    disableBorderAction
}: absensiTableInterface) => {
    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            rowCount={Math.ceil(metaPagination?.total)}
            enablePinning
            enableColumnActions={false}
            enableColumnFilters={false}
            enableTopToolbar={false}
            enableSorting={false}
            initialState={{ columnPinning: { right: [disableBorderAction ? '' : 'mrt-row-actions'] }, pagination: { pageSize: pagination?.pageSize ?? 10, pageIndex: pagination?.pageIndex ?? 0 } }}
            enableRowActions
            positionActionsColumn='last'
            renderRowActions={renderRowActions ? ({ row }) => renderRowActions(row) : undefined}
            renderRowActionMenuItems={renderRowActionMenuItems ? ({ closeMenu, row }: any) => renderRowActionMenuItems(closeMenu, row) : undefined}
            muiTablePaperProps={{
                elevation: 0, //change the mui box shadow
                sx: {
                    boxShadow: 'none',
                },
            }}
            muiTableHeadCellProps={{
                sx: {
                    background: '#F0F0F0',
                    textAlign: 'center',
                    justifyContent: 'center',

                }
            }}
            muiTableBodyCellProps={{
                sx: {
                    zIndex: 0,
                    textAlign: 'center'
                }
            }}
            muiTableBodyRowProps={muiTableBodyRowProps}
            onPaginationChange={setPagination}
            manualPagination={true} // change to true if BE already support pagination response
            paginationDisplayMode='pages'
            paginateExpandedRows={false}
            muiPaginationProps={{
                showRowsPerPage: false,
                showFirstButton: false,
                showLastButton: false,
                shape: 'rounded'
            }}
            state={{
                isLoading: loading,
                pagination: pagination
            }}
        />
    )
};

export default AbsensiTable;