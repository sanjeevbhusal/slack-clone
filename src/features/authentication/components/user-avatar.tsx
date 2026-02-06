import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useCurrentUser from "../hooks/use-current-user";

export default function UserAvatar() {
	const { user, isLoading } = useCurrentUser();

	if (isLoading) {
		return <Skeleton className="h-10 w-10 rounded-full" />;
	}

	if (!user) {
		// TODO: We should ideally never hit this case. Its better to probably add some sort of logging here.
		return <></>;
	}

	const userName = user.name
		?.split(" ")
		.slice(0, 2)
		.map((name) => name.charAt(0).toUpperCase())
		.join("");

	return (
		<Avatar className="h-10 w-10">
			<AvatarImage src={user.image} />
			<AvatarFallback>{userName}</AvatarFallback>
		</Avatar>
	);
}
