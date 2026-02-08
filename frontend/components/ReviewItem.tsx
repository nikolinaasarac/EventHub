import {Star} from "lucide-react";
import React from "react";
import {Review} from "@/models/review.model";
import {DateTimeHelper} from "@/shared/helpers/date-time.helper";

interface Props {
	review: Review
}

export function ReviewItem({review}: Props) {
	return (
		<div key={review.id}
			 className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-4">
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-3">
					<div
						className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold uppercase">
						{review.user.email.charAt(0)}
					</div>
					<div>
						<p className="font-bold text-slate-900">{review.user.email}</p>
						<p className="text-xs text-slate-400">
							{DateTimeHelper.formatDate(review.createdAt)}
						</p>
					</div>
				</div>

				<div className="flex gap-0.5">
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							className={`w-4 h-4 ${
								i < review.rating
									? "fill-yellow-400 text-yellow-400"
									: "fill-slate-200 text-slate-200"
							}`}
						/>
					))}
				</div>
			</div>

			<p className="text-slate-600 italic leading-relaxed">
				{review.comment}
			</p>
		</div>
	)
}