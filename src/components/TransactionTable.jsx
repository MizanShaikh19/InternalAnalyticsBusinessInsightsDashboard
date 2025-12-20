import React from 'react'

function formatCurrency(n) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n))
}

export default function TransactionTable({
    records,
    count,
    page,
    pageSize,
    setPage,
    sortCol,
    sortAsc,
    onSort,
    loading
}) {
    const totalPages = Math.ceil(count / pageSize)

    const handleSort = (col) => {
        if (onSort) onSort(col)
    }

    if (loading && records.length === 0) {
        return (
            <div className="card" style={{ marginTop: 24, padding: 20 }}>
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="skeleton table-skeleton-row" />
                ))}
            </div>
        )
    }

    return (
        <div className="card" style={{ marginTop: 24 }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: 16 }}>Recent Transactions</h3>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Showing {Math.min(count, (page - 1) * pageSize + 1)}-{Math.min(count, page * pageSize)} of {count}
                </div>
            </div>

            <div className="table-container" style={{ overflowX: 'auto' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('record_date')} className="sortable">
                                Date {sortCol === 'record_date' && (sortAsc ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('category')} className="sortable">
                                Category {sortCol === 'category' && (sortAsc ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('amount')} className="sortable text-right">
                                Amount {sortCol === 'amount' && (sortAsc ? '↑' : '↓')}
                            </th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(records || []).length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                                    No records found for the selected filters.
                                </td>
                            </tr>
                        ) : (
                            records.map((r) => (
                                <tr key={r.id}>
                                    <td>{new Date(r.record_date).toLocaleDateString()}</td>
                                    <td>
                                        <span className="badge">{r.category}</span>
                                    </td>
                                    <td className="text-right font-mono">{formatCurrency(r.amount)}</td>
                                    <td className="font-mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.id.slice(0, 8)}...</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button
                    disabled={page <= 1 || loading}
                    onClick={() => setPage(p => p - 1)}
                    className="btn sm"
                >
                    Previous
                </button>

                <div className="page-info">
                    Page {page} of {totalPages || 1}
                </div>

                <button
                    disabled={page >= totalPages || loading}
                    onClick={() => setPage(p => p + 1)}
                    className="btn sm"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
