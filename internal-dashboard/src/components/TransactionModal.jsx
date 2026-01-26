import React from 'react'

export default function TransactionModal({ transaction, onClose }) {
    if (!transaction) return null

    const formatCurrency = (n) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n))
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Transaction Details</h3>
                    <button className="btn sm" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="receipt">
                        <div className="receipt-header">
                            <span className="badge">{transaction.category}</span>
                            <div className="receipt-amount">{formatCurrency(transaction.amount)}</div>
                            <div className="receipt-date">{new Date(transaction.record_date).toLocaleDateString(undefined, { dateStyle: 'full' })}</div>
                        </div>

                        <div className="receipt-details">
                            <div className="detail-row">
                                <span className="label">Transaction ID</span>
                                <span className="value font-mono">{transaction.id}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Status</span>
                                <span className="value" style={{ color: 'var(--success)', fontWeight: 600 }}>Completed</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Payment Source</span>
                                <span className="value">Standard Business Account</span>
                            </div>
                        </div>

                        <div className="receipt-footer">
                            <p>Thank you for using BizDash!</p>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn primary block" style={{ width: '100%' }} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}
