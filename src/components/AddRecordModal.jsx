import React, { useState } from 'react'

export default function AddRecordModal({ categories, onSave, onClose }) {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [category, setCategory] = useState(categories[0] || 'Sales')
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!amount || isNaN(amount)) {
            setError('Please enter a valid amount')
            return
        }
        setLoading(true)
        setError(null)
        try {
            await onSave({ record_date: date, category, amount: parseFloat(amount) })
            onClose()
        } catch (err) {
            setError(err.message || 'Failed to save record')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Add New Record</h3>
                    <button className="btn sm" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <form id="add-record-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 13, fontWeight: 600 }}>Date</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="input"
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 13, fontWeight: 600 }}>Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="input"
                            >
                                {categories.filter(c => c !== 'all').map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                                {!categories.includes('Sales') && <option value="Sales">Sales</option>}
                                {!categories.includes('Service') && <option value="Service">Service</option>}
                            </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 13, fontWeight: 600 }}>Amount ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="input"
                            />
                        </div>

                        {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</div>}
                    </form>
                </div>

                <div className="modal-footer" style={{ display: 'flex', gap: 12 }}>
                    <button className="btn" onClick={onClose} disabled={loading}>Cancel</button>
                    <button
                        form="add-record-form"
                        type="submit"
                        className="btn primary"
                        style={{ flex: 1 }}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Add Record'}
                    </button>
                </div>
            </div>
        </div>
    )
}
