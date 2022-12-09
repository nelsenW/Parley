export default function RightBar({onlineMembers, offlineMembers}) {
	return (
		<aside className='active-people'>
			<h1 id='member-count'>Members -- {Object.values(onlineMembers).length}</h1>
			{Object.values(onlineMembers)?.map((member) => {
				return member.photo ? (
					<div className='member-card-wrapper'>
						<img src={member.photo} className='member-button' />
						<li>{member.username}</li>
					</div>
				) : (
					<div className='member-card-wrapper'>
						<i
							className='fa-solid fa-skull-crossbones member-button'
							style={{ backgroundColor: `${member.color}` }}></i>
						<li>{member.username}</li>
					</div>
				);
			})}

			{/* <h1 id='member-count'>
				Offline -- {Object.values(offlineMembers).length}
			</h1>
			{Object.values(offlineMembers)?.map((member) => {
				return member.photo ? (
					<div className='member-card-wrapper'>
						<img src={member.photo} className='member-button' />
						<li>{member.username}</li>
					</div>
				) : (
					<div className='member-card-wrapper'>
						<i
							className='fa-solid fa-skull-crossbones member-button'
							style={{ backgroundColor: `${member.color}` }}></i>
						<li>{member.username}</li>
					</div>
				);
			})} */}
		</aside>
	);
}
