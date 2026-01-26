import React from 'react'

export default function ExportButton({ data, filename = 'transactions.csv' }) {
    const handleExport = () => {
        if (!data || data.length === 0) {
            alert('No data to export')
            return
        }

        // Define headers
        const headers = ['ID', 'Date', 'Category', 'Amount']

        // Convert data to CSV rows
        const rows = data.map(r => [
            r.id,
            new Date(r.record_date).toLocaleDateString(),
            r.category,
            r.amount
        ])

        // Construct CSV string
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n')

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', filename)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <button onClick={handleExport} className="btn" title="Export current results to CSV">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
        </button>
    )
}
