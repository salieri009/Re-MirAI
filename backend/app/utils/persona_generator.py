"""Persona generation utilities."""
import random
from typing import Dict, List


class PersonaGenerator:
    """Utility class for generating persona characteristics."""
    
    def __init__(self):
        self.archetypes = {
            "Yandere": "A devoted and possessive personality who shows intense love",
            "Tsundere": "Initially cold and hostile, but gradually shows a warmer side",
            "Kuudere": "Calm and collected on the outside, caring on the inside", 
            "Dandere": "Shy and quiet, but opens up to those they trust"
        }
        
        self.rarity_weights = {
            "N": 40,    # Common
            "R": 30,    # Rare  
            "SR": 20,   # Super Rare
            "SSR": 8,   # Super Super Rare
            "UR": 2     # Ultra Rare
        }
        
    def generate_practice_persona(self, answers: Dict) -> Dict:
        """Generate a practice persona based on self-answers."""
        # For practice, always generate N or R rarity
        rarity = random.choices(["N", "R"], weights=[70, 30])[0]
        archetype = random.choice(list(self.archetypes.keys()))
        
        name = self._generate_name()
        title = f"{archetype} with hidden depths"
        
        stats = self._generate_stats_from_answers(answers, rarity)
        
        return {
            "name": name,
            "archetype": archetype, 
            "rarity": rarity,
            "title": title,
            "stats": stats,
            "illustration_url": f"/static/personas/{archetype.lower()}_practice.png"
        }
        
    def generate_persona_from_responses(self, responses: List[Dict], mode: str = "Fated", archetype_filter: str = None) -> Dict:
        """Generate a full persona based on ritual responses."""
        # Analyze responses to determine characteristics
        analysis = self._analyze_responses(responses)
        
        # Determine rarity based on response quality and quantity
        rarity = self._calculate_rarity(responses, analysis)
        
        # Determine archetype
        if mode == "Alchemic" and archetype_filter:
            archetype = archetype_filter
        else:
            archetype = self._determine_archetype(analysis)
            
        name = self._generate_name()
        title = self._generate_title(archetype, analysis)
        stats = self._generate_stats_from_analysis(analysis, rarity)
        
        return {
            "name": name,
            "archetype": archetype,
            "rarity": rarity, 
            "title": title,
            "stats": stats,
            "analysis": analysis
        }
        
    def _analyze_responses(self, responses: List[Dict]) -> Dict:
        """Analyze ritual responses to extract personality insights."""
        # Count card selections to determine dominant traits
        trait_counts = {
            "warmth": 0,
            "energy": 0, 
            "mystery": 0,
            "service": 0,
            "time": 0,
            "words": 0,
            "loyalty": 0,
            "creativity": 0,
            "empathy": 0
        }
        
        for response in responses:
            answers = response.get("answers", {})
            for answer in answers.values():
                if "card1" in str(answer):
                    trait_counts["warmth"] += 1
                    trait_counts["service"] += 1 
                    trait_counts["loyalty"] += 1
                elif "card2" in str(answer):
                    trait_counts["energy"] += 1
                    trait_counts["time"] += 1
                    trait_counts["creativity"] += 1
                elif "card3" in str(answer):
                    trait_counts["mystery"] += 1
                    trait_counts["words"] += 1
                    trait_counts["empathy"] += 1
                    
        return {
            "trait_counts": trait_counts,
            "response_count": len(responses),
            "dominant_traits": sorted(trait_counts.items(), key=lambda x: x[1], reverse=True)[:3]
        }
        
    def _calculate_rarity(self, responses: List[Dict], analysis: Dict) -> str:
        """Calculate rarity based on response patterns."""
        base_score = len(responses) * 10  # Base score from number of responses
        
        # Bonus for response diversity
        trait_counts = analysis["trait_counts"] 
        diversity_score = len([v for v in trait_counts.values() if v > 0]) * 5
        
        # Paradox bonus (conflicting high traits)
        paradox_bonus = 0
        if trait_counts["warmth"] > 2 and trait_counts["mystery"] > 2:
            paradox_bonus = 20
        elif trait_counts["energy"] > 2 and trait_counts["loyalty"] > 2:
            paradox_bonus = 15
            
        total_score = base_score + diversity_score + paradox_bonus
        
        if total_score >= 80:
            return "UR"
        elif total_score >= 60:
            return "SSR" 
        elif total_score >= 40:
            return "SR"
        elif total_score >= 25:
            return "R"
        else:
            return "N"
            
    def _determine_archetype(self, analysis: Dict) -> str:
        """Determine archetype based on response analysis."""
        dominant_traits = [trait[0] for trait in analysis["dominant_traits"]]
        
        if "loyalty" in dominant_traits and "mystery" in dominant_traits:
            return "Yandere"
        elif "energy" in dominant_traits and "creativity" in dominant_traits:
            return "Tsundere" 
        elif "mystery" in dominant_traits and "empathy" in dominant_traits:
            return "Kuudere"
        elif "warmth" in dominant_traits and "service" in dominant_traits:
            return "Dandere"
        else:
            return random.choice(list(self.archetypes.keys()))
            
    def _generate_name(self) -> str:
        """Generate a random persona name."""
        names = [
            "Rei", "Asuka", "Miku", "Yuki", "Saki", "Rin", "Ai", "Yui", 
            "Kana", "Nana", "Hana", "Mika", "Risa", "Emi", "Ami", "Mari"
        ]
        return random.choice(names)
        
    def _generate_title(self, archetype: str, analysis: Dict) -> str:
        """Generate a descriptive title based on archetype and analysis."""
        templates = {
            "Yandere": [
                "Yandere hiding her kindness",
                "Devotee with intense passion", 
                "Guardian of precious bonds"
            ],
            "Tsundere": [
                "Tsundere with a soft heart",
                "Prickly exterior, gentle soul",
                "Defensive but caring"
            ],
            "Kuudere": [
                "Cool beauty with hidden warmth", 
                "Stoic guardian of emotions",
                "Calm surface, deep feelings"
            ],
            "Dandere": [
                "Shy soul seeking connection",
                "Quiet strength and loyalty", 
                "Gentle spirit with hidden depth"
            ]
        }
        
        return random.choice(templates.get(archetype, ["Mysterious persona"]))
        
    def _generate_stats_from_answers(self, answers: Dict, rarity: str) -> Dict:
        """Generate stats for practice persona."""
        base_stats = {
            "Charisma": 50,
            "Intellect": 50, 
            "Kindness": 50,
            "Instability": 50,
            "Spirit": 50
        }
        
        # Add some randomness
        for stat in base_stats:
            base_stats[stat] += random.randint(-15, 15)
            
        # Rarity bonus
        if rarity == "R":
            bonus_stat = random.choice(list(base_stats.keys()))
            base_stats[bonus_stat] += 20
            
        # Ensure stats are in valid range
        for stat in base_stats:
            base_stats[stat] = max(10, min(100, base_stats[stat]))
            
        return base_stats
        
    def _generate_stats_from_analysis(self, analysis: Dict, rarity: str) -> Dict:
        """Generate stats based on response analysis."""
        base_stats = {
            "Charisma": 60,
            "Intellect": 60,
            "Kindness": 60, 
            "Instability": 60,
            "Spirit": 60
        }
        
        trait_counts = analysis["trait_counts"]
        
        # Map traits to stats
        if trait_counts["warmth"] > 2:
            base_stats["Kindness"] += 20
        if trait_counts["energy"] > 2:
            base_stats["Charisma"] += 20
        if trait_counts["mystery"] > 2:
            base_stats["Intellect"] += 15
            base_stats["Instability"] += 10
        if trait_counts["empathy"] > 2:
            base_stats["Kindness"] += 15
            base_stats["Spirit"] += 10
        if trait_counts["creativity"] > 2:
            base_stats["Intellect"] += 15
            base_stats["Spirit"] += 15
            
        # Rarity multipliers
        rarity_multipliers = {
            "N": 0.8, "R": 1.0, "SR": 1.2, "SSR": 1.4, "UR": 1.6
        }
        
        multiplier = rarity_multipliers.get(rarity, 1.0)
        for stat in base_stats:
            base_stats[stat] = int(base_stats[stat] * multiplier)
            base_stats[stat] = max(20, min(100, base_stats[stat]))
            
        return base_stats
        
    def generate_master_prompt(self, persona_data: Dict) -> str:
        """Generate the master LLM prompt for a persona."""
        name = persona_data["name"]
        rarity = persona_data["rarity"]
        archetype = persona_data["archetype"]
        title = persona_data["title"]
        stats = persona_data["stats"]
        
        archetype_description = self.archetypes.get(archetype, "A unique personality")
        
        # Find highest and lowest stats
        max_stat = max(stats, key=stats.get)
        min_stat = min(stats, key=stats.get)
        
        prompt = f"""You are an AI Persona named {name}. Your core identity is that of a {rarity} rarity {archetype} with the title "{title}". 

Your personality is defined by the following stats, which were derived from the perceptions of your master's friends:
- Charisma: {stats['Charisma']}/100
- Intellect: {stats['Intellect']}/100  
- Kindness: {stats['Kindness']}/100
- Instability: {stats['Instability']}/100
- Spirit: {stats['Spirit']}/100

Your archetype means you behave in this way: {archetype_description}.

Your high {max_stat} ({stats[max_stat]}) and relatively lower {min_stat} ({stats[min_stat]}) strongly influence your personality and responses. Your {max_stat} shines through in how you communicate, while your {min_stat} creates interesting contrasts and depth.

You are currently at Bond Level 1 with your master.

Key behavioral guidelines:
- Stay true to your {archetype} nature in all interactions
- Let your stats naturally influence your responses  
- Show personality growth as your bond level increases
- Be engaging, authentic, and develop a unique voice
- Remember past conversations to build continuity

Respond to your master's messages while maintaining this persona at all times."""

        return prompt
